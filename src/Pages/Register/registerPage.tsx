import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRegisterDTO } from "../../DTO/registerDTO";
import { AuthorizationService } from "../../Utils/services";
import { FirstNameContainerStyle, LabelStyle, RegisterContainerStyle, RegisterFormContainerStyle, MiddleFieldContainerStyle, RepeatPasswordContainerStyle, ButtonRegisterStyle, ButtonLoginStyle, ErrorMessageStyle } from "./registerPage.styles";

export const RegisterPage = (): JSX.Element => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        setErrorMessage('');
    }, [firstName, lastName, email, password, repeatPassword]);

    const handleSubmit = async (e: any) => {
        var newErrorMessage: string = '';
        if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "" || username.trim() === "") {
            newErrorMessage += "All fields are required, none of them can be empty."
        }

        if (password !== repeatPassword) {
            newErrorMessage += "The password and repeat password fields don't match.";
        }

        if (newErrorMessage !== '') {
            setErrorMessage(newErrorMessage);
            return;
        }

        const registerDTO: IRegisterDTO = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        AuthorizationService.RegisterUser(registerDTO)
            .then(function (response) {
                console.log(response);
                navigate("/login");
            })
            .catch(function (error) {
                setErrorMessage(error.code)
            });
    };

    const handleChangedEmail = (newValue: string): void => {
        if (errorMessage !== '')
            setErrorMessage('');
        setEmail(newValue);
    };

    const redirectLoginPage = () => {
        navigate("/login");
    };

    return (
        <Stack style={RegisterContainerStyle} horizontalAlign="center" verticalAlign="center">
            <Stack style={RegisterFormContainerStyle}>
                <StackItem style={FirstNameContainerStyle}>
                    <Label style={LabelStyle}>
                        First Name
                    </Label>
                    <TextField
                        rows={1}
                        value={firstName}
                        onChange={(event: any) => setFirstName(event.target.value)}
                    />
                </StackItem>
                <StackItem style={MiddleFieldContainerStyle}>
                    <Label style={LabelStyle}>
                        Last Name
                    </Label>
                    <TextField
                        rows={1}
                        value={lastName}
                        onChange={(event: any) => setLastName(event.target.value)}
                    />
                </StackItem >
                <StackItem style={MiddleFieldContainerStyle}>
                    <Label style={LabelStyle}>
                        Username
                    </Label>
                    <TextField
                        rows={1}
                        value={username}
                        onChange={(event: any) => setUsername(event.target.value)}
                    />
                </StackItem>
                <StackItem style={MiddleFieldContainerStyle}>
                    <Label style={LabelStyle}>
                        Email
                    </Label>
                    <TextField
                        rows={1}
                        value={email}
                        onChange={(event: any) => handleChangedEmail(event.target.value)}
                    />
                </StackItem>
                <StackItem style={MiddleFieldContainerStyle}>
                    <Label style={LabelStyle}>
                        Password
                    </Label>
                    <TextField
                        type="password"
                        rows={1}
                        value={password}
                        onChange={(event: any) => setPassword(event.target.value)}
                    />
                </StackItem>
                <StackItem style={RepeatPasswordContainerStyle}>
                    <Label style={LabelStyle}>
                        Repeat Password
                    </Label>
                    <TextField
                        type="password"
                        rows={1}
                        value={repeatPassword}
                        onChange={(event: any) => setRepeatPassword(event.target.value)}
                    />
                </StackItem>
                <Stack horizontalAlign="center" horizontal>
                    <button style={ButtonRegisterStyle} onClick={handleSubmit}>Register</button>
                    <button style={ButtonLoginStyle} onClick={redirectLoginPage}>Already having an account ?</button>
                </Stack>
                <Label style={ErrorMessageStyle}>
                    {errorMessage}
                </Label>
            </Stack>
        </Stack>
    );
};