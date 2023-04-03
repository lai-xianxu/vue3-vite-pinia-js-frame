import vue from '@vitejs/plugin-vue';

export const getPluginsList = (command) => {
  console.log(command, 'command');
  return [vue()];
};
