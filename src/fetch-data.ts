import { group } from 'console';
import { VariablesType } from './config-to-variables';

export type DataType = {
  error: string | null,
  data: any
};

async function fetchData(variables: VariablesType): Promise<DataType> {
  
  const { nmsIp, token, alertCount } = variables;

  /*
  * Retrieve Alerts
  */
  const my_filter = { 'closed': 0 };   // retrieve only active alerts

  const alert_data = await fetch('https://'+nmsIp+'/api/v2/alerts/filter?page=0&size=10000', {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'X-AUTH-TOKEN': token
    },
    body: JSON.stringify(my_filter)
    })
    .then(response => response.json())
    .then(data => {
      // console.log("alerts", data);
      return(data);
    })
    .catch((error) => {
      console.log(error);
    });

  /*
  * Retrieve Policies
  */
  const policies_data = await fetch('https://'+nmsIp+'/api/v2/policies?page=0&size=10000', {
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Accept': 'application/json',
      'X-AUTH-TOKEN': token
    }
    })
    .then(response => response.json())
    .then(data => {
      // console.log("policies", data);
      return(data);
    })
    .catch((error) => {
      console.log(error);
    });

  /*
  * Retrieve Thresholds
  */
  const threshold_data = await fetch('https://'+nmsIp+'/api/v2/thresholds?page=0&size=10000', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'X-AUTH-TOKEN': token
    },
    })
    .then(response => response.json())
    .then(data => {
      // console.log("thresholds", data);
      return(data);
    })
    .catch((error) => {
     console.log(error);
    });

  /*
  * Retrieve deviceGroups
  */
  const deviceGroup_data = await fetch('https://'+nmsIp+'/api/v2/devicegroups?page=0&size=10000', {
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Accept': 'application/json',
      'X-AUTH-TOKEN': token
    }
    })
    .then(response => response.json())
    .then(data => {
      console.log("deviceGroups", data.content);
      return(data.content);
    })
    .catch((error) => {
      console.log(error);
    });

  /*
  * Retrieve deviceGroups
  */
  const objectGroup_data = await fetch('https://'+nmsIp+'/api/v2/objectgroups?page=0&size=10000', {
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Accept': 'application/json',
      'X-AUTH-TOKEN': token
    }
    })
    .then(response => response.json())
    .then(data => {
      console.log("objectGroups", data.content);
      return(data.content);
    })
    .catch((error) => {
      console.log(error);
    });

  /*
  * Transform data
  */
  const totals = {
    'alerts_from_traps': 0,
    'alerts_from_alarms': 0,
    'total_alerts': alert_data.totalElements
  };

  const thresh_to_policy = {
    "threshold_id": null,
    "policy_id": null,
    "policy_name": null,
    "group_id": null,
    "groupType": null,
    "parentId": null
  }

  let traps = 0;
  let alarms = 0;
  let records = [];

  for (var alert of alert_data.content) {
    alert.origin === "trap" ? traps++ : alarms++;
    for (var threshold of threshold_data.content) {
      if (alert.thresholdId !== -1) {                 // don't process traps
        if (alert.thresholdId === threshold.id) {     // compare alert to threshold so we can determine policy id
          let record =  { ...thresh_to_policy };
          record.threshold_id = threshold.id;
          record.policy_id = threshold.policyId;
          records.push(record);
          break;
        }
      }
    }
  }

  for (var record of records){ 
    for (var policy of policies_data.content) {
      if (record.policy_id === policy.id) {         // determine policy name for each record
        record.policy_name = policy.name;
        record.group_id = policy.groupId;
        record.groupType = policy.isDeviceGroup ? "Device Group" : "Object Group";
        break;
      }
    }
  }

  // console.log("records", records);
  
  const policy_record = {
    "name": null,
    "groupType": null,
    "groupName": null,
    "group_id": null,
    "count": null
  }

  function process_new_record( record ) {
    let r = { ...policy_record };
    r.name = record.policy_name;
    r.group_id = record.group_id;
    r.groupType = record.groupType;

    if (r.groupType === "Device Group") {
      for (var group of deviceGroup_data) {
        if (group.id === r.group_id) {

          r.groupName = getGroupParents(group, "Device Group");
          break;
        }
      }
    } else {
      for (var group of objectGroup_data) {
        if (group.id === r.group_id) {

          r.groupName = getGroupParents(group, "Object Group");
          break;
        }
      }
    }
    r.count++;
    policy_arr.push(r);
  }

  function getGroupParents(my_group, groupType) {
    const groupParent = {
      "name": my_group.name,
      "groupId": my_group.id,
      "parentId": my_group.parentId,
      "groupType": groupType
    };

    while (groupParent.parentId !== null) {
      if (groupParent.groupType === "Device Group") {
        for (var group of deviceGroup_data) {
          if (groupParent.parentId) {
            if (group.id === groupParent.parentId) {
              groupParent.name = group.name + " / " + groupParent.name;
              groupParent.parentId = group.parentId;
              break;
            }
          }
        }
      } else {
        for (var group of objectGroup_data) {
          if (groupParent.parentId) {
            if (group.id === groupParent.parentId) {
              groupParent.name = group.name + " / " + groupParent.name;
              groupParent.parentId = group.parentId;
              break;
            }
          }
        }
      }
    }
    return groupParent.name;
  }

  const policy_arr = [];
  for (var record of records) {
    if (policy_arr.length === 0) {
      process_new_record( record );
    } else {
      var found = false;
      for (var p of policy_arr) {
        if (record.policy_name === p.name) {
          p.count++;
          found = true;
          break;
        } 
      }
      if ( found === false ) {
        process_new_record( record );
      }
    }
  }

  totals.alerts_from_traps = traps;
  totals.alerts_from_alarms = alarms;

  policy_arr.sort((a, b) => {
    return b.count - a.count;
});

  const mydata = {
    ...alert_data,
    totals,
    policy_arr
  }

  console.log("mydata", mydata);
  return mydata;
}
export default fetchData;
