import React, { useState } from "react";
import {
  StyledContainer2,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  Colors,
  StyledTextInput,
  StyledInputLabel,
  RightIcon,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "./../styles/styles";
import { StatusBar } from "expo-status-bar";

//Formik
import { Formik } from "formik";
import { View } from "react-native-animatable";
//icons
import { Octicons, Ionicons } from "@expo/vector-icons";
//DateTimepicker
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView, TouchableOpacity } from "react-native";
const { brand, darklight } = Colors;

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2004,1,1));

  //actual date of birth to be sent
  const [dob, setDob] = useState();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <ScrollView>
      <StyledContainer2>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo
            resizeMode="cover"
            source={require("../assets/Logos/paddlers_blue.png")}
          />
          <PageTitle>PADDLERS</PageTitle>
          <SubTitle>Registro</SubTitle>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              nameSingUp: "",
              lastnameSingUp: "",
              dateOfBirth: "",
              email: "",
              password: "",
              confirmpassword: "",
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Nombres: "
                  icon="person"
                  placeholder="Juan"
                  placeholerTextColor={darklight}
                  onChangeText={handleChange("nameSingUp")}
                  onBlur={handleBlur("nameSingUp")}
                  value={values.nameSingUp}
                />

                <MyTextInput
                  label="Apellidos: "
                  icon="person"
                  placeholder="Perez"
                  placeholerTextColor={darklight}
                  onChangeText={handleChange("lastnameSingUp")}
                  onBlur={handleBlur("lastnameSingUp")}
                  value={values.lastnameSingUp}
                />

                <MyTextInput
                  label="Fecha de nacimiento: "
                  icon="calendar"
                  placeholder="YYYY/MM/DD"
                  placeholerTextColor={darklight}
                  onChangeText={handleChange("dateOfBirth")}
                  onBlur={handleBlur("dateOfBirth")}
                  value={dob ? dob.toDateString() : ""}
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
                />
                <MyTextInput
                  label="Correo Electronico: "
                  icon="mail"
                  placeholder="acpopayan@gmail.com"
                  placeholerTextColor={darklight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Contraseña: "
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholerTextColor={darklight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MyTextInput
                  label="Confirmar contraseña: "
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholerTextColor={darklight}
                  onChangeText={handleChange("confirmpassword")}
                  onBlur={handleBlur("password")}
                  value={values.confirmpassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox>...</MsgBox>
                <StyledButton>
                  <ButtonText>Registrarse</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer2>
    </ScrollView>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  isDate,
  showDatePicker,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      {!isDate && <StyledTextInput {...props} />}
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darklight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
