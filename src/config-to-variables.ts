import { ResourceType, ConfigurationType } from './default-configuration';

export type VariablesType = {
  datasourceId: number | null,
  username: string,
  password: string,
  nmsIp: string,
  title: string,
  subTitle: string,
  token: string,
  alertCount: string,
  resources: Array<{
    type: 'DEVICE_NAME' | 'DEVICE_GROUP_PATH' | 'OBJECT' | 'OBJECT_GROUP_NAME',
    [key: string]: any
  }>,
};

function configToVariables(configuration: ConfigurationType): VariablesType {
  const {
    datasourceId,
    resources,
    username: username,
    password: password,
    nmsIp: nmsIp,
    title: title, 
    subTitle: subTitle,
    token: token,
    alertCount: alertCount
  } = configuration;

  return {
    datasourceId,
    resources,
    username,
    password,
    nmsIp,
    title,
    subTitle,
    token,
    alertCount
  };
}

export { configToVariables };