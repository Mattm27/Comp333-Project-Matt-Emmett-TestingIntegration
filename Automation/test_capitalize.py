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
    assert string_capitalizer(input_str) == expected_str

@pytest.mark.parametrize("input_list, expected_list", [
    (["two", "c", 4, ""], ["TwO", "C", "FouR", ""]),
])

@pytest.mark.list
def test_strlist(input_list, expected_list):
    result = capitalize_list(input_list)
    assert result == expected_list
