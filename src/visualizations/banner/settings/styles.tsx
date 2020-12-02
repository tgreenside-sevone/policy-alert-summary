import * as React from 'react';
import { messages } from '@sevone/insight-wdk';
import { ConfigurationType } from '../../../default-configuration';

type Props = {
  configuration: ConfigurationType,
  onMessage: (message: string, payload: any) => void
}

function Styles(props: Props) {
  const { configuration, onMessage } = props;

  console.log(configuration);

  const handleTitleChange = (value: string) => {
    onMessage(messages.updateConfiguration, {
      title: value
    });
  };

  return (
    <div>
    </div>
  );
}

Styles.title = 'Styles';

export { Styles };
