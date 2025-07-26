import { BaseVariant, enqueueSnackbar } from 'notistack';


const snackbar = (type: BaseVariant, message: string) => {
    enqueueSnackbar(message, { variant: type });
}
export default snackbar;