import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Project from '../pages/Project';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/projects" component={Project} />
  </Switch>
);

export default Routes;
