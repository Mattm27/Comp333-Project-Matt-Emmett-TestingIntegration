from unit_testing_sample_code import string_capitalizer, capitalize_list, integer_manipulator, manipulate_list
import unittest

class TestCapitalizer(unittest.TestCase):
    def test_string(self):
        tests = [("two", "TwO"),("C", "C"),("4", "FouR"),("", "")]
        print("\nString Capitalizer Tests:")
        for i, (input, expected_output) in enumerate(tests):
            with self.subTest(f"Test {i}"):
                result = string_capitalizer(input)
            try:
                self.assertEqual(result, expected_output)
                print(f"Test {i} passed! `{result}` matches `{expected_output}`.")
            except AssertionError:
                print(f"Test {i} failed! Expected: `{expected_output}`. Got: `{result}`.")

class ListCapitalizer(unittest.TestCase):
    def test_string(self):
        tests = [(["two", "C", "4", ""], ["TwO", "C", "FouR", ""])]
        print("\nList Capitalizer Tests:")
        for i, (input_list, expected) in enumerate(tests):
            with self.subTest(f"Test {i}"):
                result_list = capitalize_list(input_list)  # Unpack the tuple
                print(f"Test {i}:")

                for j, (result_part, expected_part) in enumerate(zip(result_list, expected)):
                    with self.subTest(f"Part {j} in test {i}"):
                        try:
                            self.assertEqual(result_part, expected_part)
                            print(f"Part {j} in test {i} passed! `{result_part}` matches `{expected_part}`.")
                        except AssertionError:
                            print(f"Part {j} in test {i} failed. Expected: `{expected_part}`. Got: `{result_part}`.")

class IntegerManip(unittest.TestCase): #Double Check Final Test
    def test_string(self):
        tests = [(66, 66),(2, 2),(6, 6),(0, 0),('three', 1)]
        print("\nInteger Manipulator Tests:")
        for i, (input_int, output_int) in enumerate(tests):
            with self.subTest(f"Test {i}"):
                result = integer_manipulator(input_int)
            try:
                self.assertEqual(result, output_int)
                print(f"Test {i} passed! `{result}` matches `{output_int}`.")
            except AssertionError:
                print(f"Test {i} failed! Expected: `{output_int}`. Got: `{result}`.")
            
class ListManip(unittest.TestCase):
    def test_string(self):
        tests = [([66,2,6,0,'three'],[66,2,6,0,1])]
        print("\nManipulate List Tests:")
        for i, (inint_list, outint_list) in enumerate(tests):
            with self.subTest(f"Test {i}"):
                result_list = manipulate_list(inint_list)  # Unpack the tuple
                print(f"Test {i}:")

                for j, (result_int, expected_int) in enumerate(zip(result_list, outint_list)):
                    with self.subTest(f"Part {j} in test {i}"):
                        try:
                            self.assertEqual(result_int, expected_int)
                            print(f"Part {j} in test {i} passed! `{result_int}` matches `{expected_int}`.")
                        except AssertionError:
                            print(f"Part {j} in test {i} failed. Expected: `{expected_int}`. Got: `{result_int}`.")
                    
if __name__ == "__main__":
    unittest.main()


