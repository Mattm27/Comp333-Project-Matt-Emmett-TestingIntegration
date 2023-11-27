from unit_testing_sample_code import integer_manipulator, manipulate_list
import pytest

@pytest.mark.parametrize("input_int, expected_int", [
    (10, 66),
    (2, 2),
    (3, 6),
    (0, 0),
    ("three", 1)
])

@pytest.mark.int
def test_integer_manipulator(input_int, expected_int):
    assert integer_manipulator(input_int) == expected_int

@pytest.mark.parametrize("input_list, expected_list", [
    ([10, 2, 3, 0, "three"], [66, 2, 6, 0, 1]),
])

@pytest.mark.list
def test_manipulate_list(input_list, expected_list):
    result = manipulate_list(input_list)
    assert result == expected_list