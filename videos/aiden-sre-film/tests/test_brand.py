import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import lint_brand


def test_flags_offbrand_color_radius_font(tmp_path):
    f = tmp_path / "x.html"
    f.write_text('<style>.a{color:#FF0000;border-radius:8px;font-family:Inter,sans-serif}'
                 '.b{color:#ba99fd;border-radius:0;font-family:"Geist",sans-serif}</style>')
    errs = lint_brand.lint([f])
    assert len(errs) == 3
    assert any("#FF0000" in e for e in errs) and any("8px" in e for e in errs) and any("Inter" in e for e in errs)


def test_repo_is_clean():
    assert lint_brand.lint(lint_brand.targets()) == []
