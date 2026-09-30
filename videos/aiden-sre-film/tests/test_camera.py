import json, sys
from pathlib import Path
import pytest
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from lib import camera

K0 = {"x": 0, "y": 0, "z": 0, "rx": 0, "ry": 0, "rz": 0, "scale": 1.0}
CAM = {"from": K0, "to": {**K0, "ry": -4, "scale": 1.05}, "blur": "normal"}


def test_make_and_validate():
    c = camera.validate(camera.make("S01", 4.6, CAM))
    assert c["keys"][-1]["t"] == 4.6 and c["perspective"] == 2400 and c["ease"] == "power2.inOut"


def test_scale_counts_as_motion():
    assert camera.is_moving(camera.make("S01", 4.6, CAM))


def test_rotation_only_is_static():
    assert not camera.is_moving(camera.make("X", 4, {**CAM, "to": {**K0, "ry": -12}}))


def test_drift_threshold():
    assert camera.is_moving(camera.make("X", 4, {**CAM, "to": {**K0, "x": 30}}))
    assert not camera.is_moving(camera.make("X", 4, {**CAM, "to": {**K0, "x": 29}}))


def test_bad_blur_rejected():
    with pytest.raises(ValueError):
        camera.validate(camera.make("X", 4, {**CAM, "blur": "extreme"}))


def test_every_repo_camera_moves():  # acceptance A3
    files = sorted((ROOT / "camera").glob("S*.json"))
    assert len(files) == 27
    for p in files:
        assert camera.is_moving(camera.validate(json.loads(p.read_text()))), p.name
