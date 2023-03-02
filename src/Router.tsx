import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PublicAuth from 'src/components/Auth/PublicAuth'
import PrivateAuth from 'src/components/Auth/PrivateAuth'
import ToolsLayout from 'src/layouts/Tools'
import PublicLayout from 'src/layouts/Public'
import Tools from 'src/pages/Tools'
import SignIn from 'src/pages/SignIn'
import Landing from 'src/pages/Landing'
import FileConvert from 'src/pages/Tools/FileConvert'
import Profile from 'src/pages/Profile'

function Router() {
  return (
    <Switch>
      <Route
        exact
        path="/sign-in"
        render={props => (
          <PublicAuth {...props}>
            <SignIn />
          </PublicAuth>
        )}
      />
      <Route
        path="/"
        render={() => (
          <PublicLayout>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/file-convert" component={FileConvert} />
              <Route
                exact
                path="/tools"
                render={() => (
                  <ToolsLayout>
                    <Tools />
                  </ToolsLayout>
                )}
              />
              <Route
                exact
                path="/profile"
                render={props => (
                  <PrivateAuth {...props}>
                    <Profile />
                  </PrivateAuth>
                )}
              />
              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </PublicLayout>
        )}
      />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  )
}
export default Router
