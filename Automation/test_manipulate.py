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
    actual = integer_manipulator(input_int)
    assert integer_manipulator(input_int) == expected_int, (f"For {input_int}: expected {expected_int}, but got {actual}")

@pytest.mark.parametrize("input_list, expected_list", [
    ([10, 2, 3, 0, "three"], [66, 2, 6, 0, 1]),
])

@pytest.mark.list
def test_manipulate_list(input_list, expected_list):
    result = manipulate_list(input_list)
    for i, (actual, expected) in enumerate(zip(result, expected_list)):
        assert actual == expected, (f"For input_list[{i}]: expected {expected}, but got {actual}")