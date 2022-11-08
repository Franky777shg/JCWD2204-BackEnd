import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import swal from "sweetalert2";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import background from "../assets/background-register.avif";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// setup redux
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
const url = "http://localhost:2000/auth/register";

export const RegisterPage = () => {
  const [messageErr, setMessageErr] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        return swal.fire(
          "Oops...",
          "Make sure password and confirm password match",
          "error"
        );
      }

      console.log(values);
      const { data } = await axios.post(url, values);
      console.log(data);
      dispatch(login(data));
      swal.fire({
        icon: "success",
        title: "Yeay!",
        text: "Register Success :)",
        timer: 1800,
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.log(err);
      swal.fire("Oops...", "Something Error", "error");
    }
  };

  const registerSchema = Yup.object().shape({
    password: Yup.string().required().min(6, "Password min 6 Character"),
    username: Yup.string().required().min(6, "Username  min 6 Character"),
    email: Yup.string().email().required(),
  });

  return (
    <Grid templateColumns="0.55fr 0.45fr" gap={2} h="100vh">
      <GridItem w="100%" style={{ backgroundImage: `url(${background})` }} />
      <GridItem w="100%">
        <Center w="100%" h="100%">
          <Box
            // h="60%"
            w="60%"
            border="1px"
            borderColor="gray"
            borderRadius={20}
            boxShadow="10px 10px"
            p={5}
          >
            <Formik
              initialValues={{
                password: "",
                username: "",
                email: "",
                confirmPassword: "",
              }}
              validationSchema={registerSchema}
              onSubmit={(values, action) => {
                onRegister(values);
              }}
            >
              {(props) => {
                console.log(props);
                return (
                  <Form>
                    <Heading textAlign="center" mb="10px">
                      Sign Up
                    </Heading>
                    <Text textAlign="center" mb="30px" fontSize="xl">
                      Already have an account? Sign in here
                    </Text>
                    <Input as={Field} name="username" placeholder="Username" />
                    <ErrorMessage
                      style={{ color: "red" }}
                      component="div"
                      name="username"
                    />
                    <Input
                      mt="20px"
                      as={Field}
                      name="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      style={{ color: "red" }}
                      component="div"
                      name="email"
                    />
                    <Input
                      mt="20px"
                      as={Field}
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      style={{ color: "red" }}
                      component="div"
                      name="password"
                    />
                    <Input
                      mt="20px"
                      as={Field}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <Button
                      w="100%"
                      mt="20px"
                      colorScheme="orange"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Center>
      </GridItem>
    </Grid>
  );
};
