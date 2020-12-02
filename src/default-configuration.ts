import { ResourceSelection } from '@sevone/insight-connect';

type ResourceSelectionType = React.ComponentProps<typeof ResourceSelection>;

export type ResourceType = ResourceSelectionType['value'];

export type ResourceHierarchicalDataType = Array<ResourceType>;


export type ConfigurationType = {
  visualization: string,
  username: string,
  password: string,
  nmsIp: string,
  title: string,
  token: string,
  alertCount: string,
  subTitle: string,
  resources: Array<ResourceType> | null,
  resourceHierarchicalData: ResourceHierarchicalDataType
}

const defaultConfiguration: ConfigurationType = {
  resources: null,
  resourceHierarchicalData: [],
  visualization: 'Table',
  username: null,
  password: null,
  nmsIp: null,
  title: 'A Table',
  subTitle: null,
  token: null,
  alertCount: '10000'
};

export default { defaultConfiguration };