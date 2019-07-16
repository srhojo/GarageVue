export default class MethodsUtils {
    public static checkImage(imageToCheck: string) {
        return imageToCheck ? `data:image/png;charset=utf-8;base64,${imageToCheck}` : require('@/assets/no-image.png');
    }

    public static revisedRandId() {
        return Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')
            .substr(2, 10);
    }
}




