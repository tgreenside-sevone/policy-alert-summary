import defaultConfiguration from './default-configuration';
import { configToVariables } from './config-to-variables';
import fetchData from './fetch-data';
import settings from './settings';
import visualizations from './visualizations';
import { widgetWillMount, widgetWillUnmount } from './lifecycle';


const widget = {
  defaultConfiguration,
  configToVariables,
  mapInputToConfig: () => ({}),
  fetchData,
  settings,
  visualizations,
  widgetWillMount,
  widgetWillUnmount
};

export default widget;
