import { VERBS } from '../../constants';
import { call, put, take, takeLatest } from 'redux-saga/effects';
import * as handleCallApi from '../../shared/services/handleCallApi';
import * as menActions from '../../containers/Pages/Men/redux/actions';
import * as globalActions from '../actions/globalActions';
import * as registerActions from '../../containers/Pages/Register/redux/actions';
import * as getShoesCartActions from '../../containers/Pages/MyShoppingCartPage/redux/actions';
import * as loginActions from '../../containers/Pages/Login/redux/actions';
// import { getMenShoes } from '../containers/Pages/Men/redux/actions';

// function* fetchMenShoes(action) {
//     try {
//         const result = yield call(handleCallApi.getMenShoes);
//         yield put(menActions.getMenShoes.getMenShoesSuccess(result.data));
//     } catch (error) {
//         yield put(menActions.getMenShoes.getMenShoesFailure(error));
//     }
// }

function* fetchMenShoes(action) {
    const { data, error } = yield call(handleCallApi.getMenShoes);
    if (error) {
        yield put(menActions.getMenShoes.getMenShoesFailure(error));
        return;
    }
    yield put(menActions.getMenShoes.getMenShoesSuccess(data));
}

function* registerAccount(action) {
    /* try {
        const result = yield call(handleCallApi.createAccount, action.payload);
        yield put(
            registerActions.registerAccount.registerAccountSuccess(result.data)
        );
    } catch (error) {
        console.log('error', error);
        yield put(
            registerActions.registerAccount.registerAccountFailure(error)
        );
    } */

    const { data, error } = yield call(
        handleCallApi.createAccount,
        action.payload
    );
    // has error
    if (error) {
        yield put(
            registerActions.registerAccount.registerAccountFailure(error)
        );
        return;
    }
    // no error
    yield put(registerActions.registerAccount.registerAccountSuccess(data));
}

function* loginAccount(action) {
    const { data, error } = yield call(
        handleCallApi.loginAccount,
        action.payload
    );
    //has error
    if (error) {
        yield put(loginActions.loginAccount.loginAccountFailure(error));
        return;
    }
    yield put(loginActions.loginAccount.loginAccountSuccess(data));
}

function* addUserCart(action) {
    const { data, error } = yield call(
        handleCallApi.addUserCart,
        action.payload
    );
    //has error
    if (error) {
        yield put(globalActions.addToCartShoes.addToCartShoesFailure(error));
        return;
    }
    yield put(globalActions.addToCartShoes.addToCartShoesSuccess(data));
}

//update shoes in cart
function* updateUserCart(action) {
    const { data, error } = yield call(
        handleCallApi.updateUserCart,
        action.payload
    );
    //has error
    if (error) {
        yield put(
            globalActions.updateToCartShoes.updateToCartShoesFailure(error)
        );
        return;
    }
    yield put(globalActions.updateToCartShoes.updateToCartShoesSuccess(data));
}

//delete shoes from cart
function* deleteFromUserCart(action) {
    const { data, error } = yield call(
        handleCallApi.deleteUserCart,
        action.payload
    );
    //has error
    if (error) {
        yield put(
            globalActions.deleteFromCartShoes.deleteFromCartShoesFailure(error)
        );
        return;
    }
    yield put(
        globalActions.deleteFromCartShoes.deleteFromCartShoesSuccess(data)
    );
}

function* getShoesCart(action) {
    const { data, error } = yield call(
        handleCallApi.getShoesCart,
        action.payload
    );
    //has error
    if (error) {
        yield put(getShoesCartActions.getShoesCart.getShoesCartFailure(error));
        return;
    }
    yield put(getShoesCartActions.getShoesCart.getShoesCartSuccess(data));
}

function* listenerSaga() {
    yield takeLatest(
        globalActions.addToCartShoes.addToCartShoesRequest,
        addUserCart
    );

    yield takeLatest(menActions.getMenShoes.getMenShoesRequest, fetchMenShoes);

    yield takeLatest(
        registerActions.registerAccount.registerAccountRequest,
        registerAccount
    );
    yield takeLatest(
        loginActions.loginAccount.loginAccountRequest,
        loginAccount
    );
    yield takeLatest(
        getShoesCartActions.getShoesCart.getShoesCartRequest,
        getShoesCart
    );

    yield takeLatest(
        globalActions.updateToCartShoes.updateToCartShoesRequest,
        updateUserCart
    );

    yield takeLatest(
        globalActions.deleteFromCartShoes.deleteFromCartShoesRequest,
        deleteFromUserCart
    );
}

export default listenerSaga;
