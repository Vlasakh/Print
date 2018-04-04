/**
 * Created by Vlasakh
 */


export class Framework
{
    /**
     * Init reducer and export action processor
     * @param Reducer
     * @return actionsHandler
     */
    static getHandler(Reducer)
    {
        const $Reducer = new Reducer();
        return $Reducer.actionsHandler.bind($Reducer);
    }


    /**
     * Init actions
     * @param Actions
     * @return object
     */
    static initAction(Actions)
    {
        return (new Actions()).export();
    }
}
