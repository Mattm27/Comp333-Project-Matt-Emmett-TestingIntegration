from unit_testing_sample_code import string_capitalizer, capitalize_list, integer_manipulator, manipulate_list
import unittest

def test_string(test_num, expected, result):
    try:
        assert result == expected
        print(f"Test {test_num} passed! `{result}` matches `{expected}`.")
    except AssertionError:
        print(f"Test {test_num} failed. Expected: `{expected}`. Got: `{result}`.")

def test_strlist(test_num, expected, result):
    for i, (result_part, expected_part) in enumerate(zip(result, expected)):
        try:
            assert result_part == expected_part
            print(f"Part {i} in test {test_num} passed! `{result_part}` matches `{expected_part}`.")
        except AssertionError:
            print(f"Part {i} in test {test_num} failed. Expected: `{expected_part}`. Got: `{result_part}`.")

def test_int(test_num, expected, result):
    try:
        assert result == expected
        print(f"Test {test_num} passed! `{result}` matches `{expected}`.")
    except AssertionError:
        print(f"Test {test_num} failed. Expected: `{expected}`. Got: `{result}`.")

def test_intlist(test_num, expected, result):
    for i, (result_part, expected_part) in enumerate(zip(result, expected)):
        try:
            assert result_part == expected_part
            print(f"Part {i} in test {test_num} passed! `{result_part}` matches `{expected_part}`.")
        except AssertionError:
            print(f"Part {i} in test {test_num} failed. Expected: `{expected_part}`. Got: `{result_part}`.")

if __name__ == "__main__":
    print("\nString Capitalizer Tests:")
    test_string("0", "TwO", string_capitalizer("two"))
    test_string("1", "C", string_capitalizer("c"))
    test_string("2", "FouR", string_capitalizer(4))
    test_string("3", "", string_capitalizer(""))

    print("\nList Capitalizer Tests:")
    test_strlist("0", ["TwO","C","FouR",""], capitalize_list(["two","c",4,""]))

    print("\nInteger Manipulator Tests:")
    test_int("0", 66, integer_manipulator(10))
    test_int("1", 2, integer_manipulator(2))
    test_int("2", 6, integer_manipulator(3))
    test_int("3", 0, integer_manipulator(0))
    test_int("4", 1, integer_manipulator("three"))

    print("\nManipulate List Tests:")
    test_intlist("0", [66,2,6,0,1], manipulate_list([10,2,3,0,"three"]))
                    


