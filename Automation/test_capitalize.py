from unit_testing_sample_code import string_capitalizer, capitalize_list
import pytest

@pytest.mark.parametrize("input_str, expected_str", [
    ("two", "TwO"),
    ("c", "C"),
    (4, "FouR"),
    ("", "")
])

@pytest.mark.string
def test_string(input_str, expected_str):
    actual = string_capitalizer(input_str)
    assert string_capitalizer(input_str) == expected_str, (f"For {input_str}: expected {expected_str}, but got {actual}")

@pytest.mark.parametrize("input_list, expected_list", [
    (["two", "c", 4, ""], ["TwO", "C", "FouR", ""]),
])

@pytest.mark.list
def test_strlist(input_list, expected_list):
    result = capitalize_list(input_list)
    for i, (actual, expected) in enumerate(zip(result, expected_list)):
        assert actual == expected, (f"For input_list[{i}]: expected {expected}, but got {actual}")
