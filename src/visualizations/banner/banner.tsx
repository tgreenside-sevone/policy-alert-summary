import * as React from 'react';
import { Table } from '@sevone/insight-charts';
import icon from '../../assets/icons/generic.svg';
import { ConfigurationType } from '../../default-configuration';
// import Settings from './settings';
import { useTheme } from '@sevone/insight-connect';


type Props = {
  configuration: ConfigurationType,
  data: any
};
  
function Banner(props: Props) {

  const { data, configuration } = props;
  const { theme } = useTheme();
     
  //console.log(configuration);
  //console.log("data", data);

  if (!data) {
    console.log("no data");
    return null;
  }

  const columns = [
    {
      id: 'name',
      title: 'Policy Name',
      render: row => row.name,
    },
    {
      id: 'group_type',
      title: 'Group Type',
      render: row => row.group_type,
    },
    {
      id: 'group_name',
      title: 'Group Name',
      render: row => row.group_name,
    },
    {
      id: 'alerts',
      title: 'Current Alerts',
      render: row => row.alerts,
    },
  ]

  const rows = [];
  for (var policy of data.policy_arr) {
    rows.push({ 
      id: policy.name, 
      name: policy.name, 
      group_type: policy.groupType, 
      group_name: policy.groupName,
      alerts: policy.count
    });
  }

  return (
    <Table
      rows={rows}
      columns={columns}
      theme={theme}
      title={'Alert Count By Policy'}
      subtitle = {' '}
      wrapCells={true}
    />
    )
}


Banner.title = 'Table';
Banner.icon = icon;
Banner.settings = [];

export default Banner;
