"""Camera file schema + motion check. Spec §4.2, acceptance A3."""
import math

FIELDS = ("x", "y", "z", "rx", "ry", "rz", "scale")


def make(shot_id, duration, cam):
    d = round(duration, 3)
    return {"shot": shot_id, "duration": d, "perspective": cam.get("perspective", 2400),
            "keys": [{"t": 0.0, **cam["from"]}, {"t": d, **cam["to"]}],
            "ease": cam.get("ease", "power2.inOut"), "blur": cam.get("blur", "normal")}


def validate(c):
    for f in ("shot", "duration", "perspective", "keys", "ease", "blur"):
        if f not in c:
            raise ValueError(f"{c.get('shot')}: missing {f}")
    if c["blur"] not in ("normal", "heavy"):
        raise ValueError(f"{c['shot']}: blur must be normal|heavy")
    if len(c["keys"]) < 2:
        raise ValueError(f"{c['shot']}: need >= 2 keys")
    for k in c["keys"]:
        missing = [f for f in ("t",) + FIELDS if f not in k]
        if missing:
            raise ValueError(f"{c['shot']}: key missing {missing}")
    ts = [k["t"] for k in c["keys"]]
    if ts[0] != 0 or ts != sorted(ts) or abs(ts[-1] - c["duration"]) > 1e-3:
        raise ValueError(f"{c['shot']}: key times must run 0..duration")
    return c


def is_moving(c, min_scale=0.02, min_drift=30.0):
    a = c["keys"][0]
    for k in c["keys"][1:]:
        if abs(k["scale"] - a["scale"]) / a["scale"] >= min_scale - 1e-9:
            return True
        if math.dist((k["x"], k["y"], k["z"]), (a["x"], a["y"], a["z"])) >= min_drift:
            return True
    return False
