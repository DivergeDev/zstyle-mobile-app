module.exports = function (api){
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            // add other plugins above here (ex. 'nativewind/babel')
            'react-native-worklets/plugin', // CRITICAL: must be last plugin
        ],
    }
}