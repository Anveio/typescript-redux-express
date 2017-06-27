import * as React from 'react';
import {
  Layout,
  DisplayText,
  FormLayout,
  Card,
  TextField,
  Button
} from '@shopify/polaris';

export interface Props {
  readonly loading: boolean;
  readonly email: AuthTextField;
  readonly username: AuthTextField;
  readonly password: AuthTextField;
  readonly passwordConf: AuthTextField;
  readonly onChangeEmail: (value: string) => void;
  readonly onChangeUserName: (value: string) => void;
  readonly onChangePassword: (value: string) => void;
  readonly onChangePasswordConf: (value: string) => void;
  readonly onSubmit: (payload: SignupPayload) => void;
}

export default (props: Props) => {
  const {
    email,
    username,
    password,
    passwordConf,
    onChangeEmail,
    onChangeUserName,
    onChangePassword,
    onChangePasswordConf,
    onSubmit
  } = props;

  const handleSignUp = (): void => {
    onSubmit({
      email: email.text,
      username: username.text,
      password: password.text,
      passwordConf: passwordConf.text
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    handleSignUp();
  };

  const validForm = (): boolean => {
    // Todo: add realtime client side validation
    return !(
      !!email.text &&
      !!username.text &&
      !!password.text &&
      !!passwordConf.text
    );
  };

  return (
    <Layout.Section>
      <Card sectioned>
        <FormLayout>
          <DisplayText size="medium">Create an account.</DisplayText>
          <form onSubmit={handleSubmit} acceptCharset="UTF-8">
            <TextField
              label="Email address"
              type="email"
              value={email.text}
              placeholder="e.g. name@business.com"
              onChange={onChangeEmail}
              error={email.error || false}
              spellCheck={false}
              autoFocus
            />
            <TextField
              label="Username"
              type="text"
              value={username.text}
              placeholder="No spaces or numbers."
              onChange={onChangeUserName}
              error={username.error || false}
              spellCheck={false}
            />
            <TextField
              label="Password"
              type="password"
              value={password.text}
              placeholder="At least 6 characters."
              onChange={onChangePassword}
              error={password.error || false}
              min={6}
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={passwordConf.text}
              placeholder="Same as your password."
              min={6}
              onChange={onChangePasswordConf}
              error={password.error || false}
            />
            <br />
            <Button
              primary
              icon="circleChevronRight"
              onClick={handleSignUp}
              disabled={validForm()}
              accessibilityLabel="Sign up"
            >
              Sign up.
            </Button>
          </form>
        </FormLayout>
      </Card>
    </Layout.Section>
  );
};
