import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILoginDTO } from "../../DTO/loginDTO";
import { AuthorizationService } from "../../Utils/services";
import { ButtonLoginStyle, ButtonRegisterStyle, UsernameContainerStyle, ErrorMessageStyle, LabelStyle, LoginContainerStyle, LoginFormContainerStyle, PasswordContainerStyle } from "./loginPage.styles";

export const LoginPage = (): JSX.Element => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const BLANK_EMAIL_OR_PASSWORD: string = "The username and/or password can't be blank.";

    const handleSubmit = async (e: any) => {
        if (username.trim() === '' || password === '') {
            setErrorMessage(BLANK_EMAIL_OR_PASSWORD);
            return;
        }

        const loginDTO: ILoginDTO = {
            username: username,
            password: password
        };

        AuthorizationService.LoginUser(loginDTO)
            .then(function (response) {
                // Cookies.set("jwtUser", response.data);
                // navigate("/issueTrackerApp");
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message)
            });
    };

    const redirectCreateNewAccount = () => {
        navigate("/register");
    };

    const removeErrorMessage = (): void => {
        if (errorMessage !== '')
            setErrorMessage('');
    };

    return (
        <Stack style={LoginContainerStyle} horizontalAlign="center" verticalAlign="center">
            <Stack style={LoginFormContainerStyle}>
                <StackItem style={UsernameContainerStyle}>
                    <Label style={LabelStyle}>
                        Username
                    </Label>
                    <TextField
                        rows={1}
                        value={username}
                        onChange={(event: any) => { setUsername(event.target.value); removeErrorMessage(); }}
                    />
                </StackItem>
                <StackItem style={PasswordContainerStyle}>
                    <Label style={LabelStyle}>
                        Password
                    </Label>
                    <TextField
                        type="password"
                        canRevealPassword={true}
                        rows={1}
                        value={password}
                        onChange={(event: any) => { setPassword(event.target.value); removeErrorMessage(); }}
                    />
                </StackItem>
                <Stack horizontalAlign="center" horizontal>
                    <button style={ButtonLoginStyle} onClick={handleSubmit}>Log in</button>
                    <button style={ButtonRegisterStyle} onClick={redirectCreateNewAccount}>Create a new account</button>
                </Stack>
                <Label style={ErrorMessageStyle}>
                    {errorMessage}
                </Label>
            </Stack>
        </Stack>
    );
};