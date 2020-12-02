import * as React from 'react';
import { messages } from '@sevone/insight-wdk';
import styled from 'styled-components';
import { Input, Button, Tooltip, CircleInfoIcon } from '@sevone/scratch';
import { ConfigurationType } from '../../default-configuration';
import { ResourceSelection } from '@sevone/insight-connect';
import { resourcePaths } from './resource-paths';

type ResourceSelectionType = React.ComponentProps<typeof ResourceSelection>;

const TooltipHelper = styled.div`
  font-size: calc(var(--sev1-size) * .8);
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const InfoWrapper = styled.div`
  margin-left: auto;
`;

const TitleWrapper = styled.div`
  margin-bottom: calc(var(--sev1-size) * .5);
`;

const TooltipWrapper = styled.div`
  max-width: 275px;
`;

const LimitWrapper = styled.div`
  margin-bottom: 10px;
`;


type Props = {
  configuration: ConfigurationType,
  onMessage: (msg: string, payload: any) => void
};

type State = {
  datasource: ResourceSelectionType['datasource'],
  value: ResourceSelectionType['value'],
  hierarchicalData: ResourceSelectionType['hierarchicalData']
};



function Resources(props: Props) {
  const { configuration, onMessage } = props;
  const [ username, setUsername ] = React.useState(configuration.username);
  const [ password, setPassword] = React.useState(configuration.password);
  const [ nmsIp, setNmsIp ] = React.useState(configuration.nmsIp);

  const handleRunClick = () => {
    onMessage(messages.updateConfiguration, {
      username,
      password,
      nmsIp
    });
  };

  return (
    <div>
      <Input
          label={'SevOne NMS IP Address'}
          value={nmsIp}
          onChange={setNmsIp}
        /><br/>
        <Input
          label={'Username'}
          value={username}
          onChange={setUsername}
        /><br/>
        <Input
          label={'Password'}
          type='Password'
          value={password}
          onChange={setPassword}
        /><br/>
        <Button
          fullWidth
          disabled={!username || !password || !nmsIp}
          onClick={handleRunClick}
        >{'Run'}</Button>
    </div>
  );
}
Resources.title = 'Resources';

export { Resources };
