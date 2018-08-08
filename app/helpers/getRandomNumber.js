/**
 * Created by nirbenya on 07/10/2017.
 */
export default (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;

}