let files = ['index.js', 'dice.js', 'treasure.js'];

export default files.map(function (file) {
    return {
        input : `src/js/${file}`,
        output : {
            file : `dist/js/${file}`,
            format : 'iife'
        }
    }
})