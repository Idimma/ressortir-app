import {
    AppService,
    AuthService,
    BookingService,
    CardService,
    CartService,
    CategoryService,
    OrderService,
    UserService,
    WalletService
} from '../services';
import {getJSONData, setAppState, showAlert} from './NavigationRef';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

export const keyExtractor = (item, index) => index.toString();

export const Naira = '₦';

// export const formatImage = image => {
//   let filename = image.uri.split('/')
//     .pop();
//   let match = /\.(\w+)$/.exec(filename);
//   let type = match ? `image/${match[1]}` : `image`;
//   return {
//     uri: image.uri,
//     name: filename,
//     type
//   };
// };
export const refactorProductList = f => ({
    ...f,
    _price: f.discount ? f.discount : f.price,
    _discount: f.discount,
    price: f.discount !== null ? `${Naira}${f.discount}` : `${Naira}${f.price}`,
    // _id: f.uuid,
    // id: f.uuid,
    uuid: f.uuid,
    name: f.name,
    description: f.description,
    beforeDiscount: f.discount ? `${Naira}${f.price}` : '  ',
    sold: 30,
    numberOfReviews: f.views || '0',
    rating: f.average_rating || 0,
    variants: f.price_distribution.map(s => `Weight: ${s.weight + f.unit || ' '}, Price: ${Naira + (s.discount ? s.discount : s.price) || ''} `),
    images: f.images.map(x => ({uri: x.file_url})),
});

export const catchError = (error, full) => {
    console.log(error.response);
    if (error.response) {
        const data = error.response.data;
        if (data.message && data.message.includes('Unauthenticated')) {
            showError('Your authentication expired');
            setAppState({isLoggedIn: false});
            AsyncStorage.clear();
            return;
        }
        if (data.errors) {
            const arr = Object.keys(data.errors);
            arr.forEach(e => {
                data.errors[e].forEach(err => {
                    full && full(err);
                    showAlert()
                        .alertWithType('error', 'Error !!!', err);
                });
            });
            return;
        }
        if (data.error) {
            full && full(data.error);

            return showAlert()
                .alertWithType('error', 'Error !!!', data.error);
        }
        if (data.message) {
            full && full(data.message);

            return showAlert()
                .alertWithType('error', 'Error !!!', data.message);
        }
    }
    full && full(error.message);

    showAlert()
        .alertWithType('error', 'Error !!!', error.message);
};

export const showSuccess = (message, title = 'Success !!!') => showAlert()
    .alertWithType('success', title, message);
export const showInfo = (message, title = 'Info !!!') => showAlert()
    .alertWithType('info', title, message);
export const showWarning = (message, title = 'Warning !!!') => showAlert()
    .alertWithType('warning', title, message);
export const showError = (message, title = 'Error !!!') => showAlert()
    .alertWithType('error', title, message);

export function formatMoney(_amount, decimalCount = 2, decimal = '.', thousands = ',') {
    try {
        let amount = isNull(_amount) ? 0 : _amount;
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
        const negativeSign = amount < 0 ? '-' : '';
        let i = parseInt(amount = Math.abs(Number(amount) || 0)
            .toFixed(decimalCount))
            .toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j)
            .replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2) : '');
    } catch (e) {
    }
}

export const day = () => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
        return 'Morning';
    } else if (curHr < 18) {
        return 'Afternoon';
    } else {
        return 'Evening';
    }
};

export const isIOS = Platform.OS === 'ios';

export const formatImage = image_uri => {
    let name = image_uri.split('/')
        .pop();
    let match = /\.(\w+)$/.exec(name);
    let type = isIOS ? 'image' : match ? `image/${match[1]}` : 'image/jpeg';
    const uri = isIOS ? image_uri.replace('file://', '') : image_uri;
    return {
        uri,
        name,
        type
    };
};

export const isNull = (value) => (value === null || value === undefined || value === '' || value === 'null');

export const noAction = (e) => console.log(e.response);


export const loadProfile = () => {
    setTimeout(() => {
        AuthService.findById()
            .then(({data}) => {
                setAppState({user: data.data});
            })
            .catch(noAction);
    //     loadProfile()
    }, 2000);
};

export const loadOrder = () => {
    AppService.allOrders()
        .then(({data}) => {
            setAppState({orders: data.data});
        })
        .catch(catchError);
};

function rand(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum);
}

function genCharArray(charA, charZ) {
    let a = [],
        i = charA.charCodeAt(0),
        j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

export const uuidV4 = () => {
    const hex = [...genCharArray('0', '9'), ...genCharArray('A', 'Z'),];
    let color = '';
    for (let i = 0; i < 8; i++) {
        color += hex[rand(0, hex.length)];
    }
    return color;
};

export const formatSchool = school => {
    const {
        name,
        reg_no,
        phone,
        address,
        state,
        lga,
        principal_last_name,
        uploaded_by_me,
        principal_first_name,
        principal_email,
        principal_phone,
        acct_no,
        acct_bank,
        acct_name,
        bank_name,
        contact_phone,
    } = school;
    return {
        name,
        reg_no,
        phone,
        address,
        state,
        lga,
        principal_last_name,
        uploaded: true,
        uploaded_by_me,
        principal_first_name,
        principal_email,
        principal_phone,
        acct_no,
        acct_bank,
        acct_name,
        bank_name,
        contact_phone,
    };
};

export const formatNotification = ({
                                       text,
                                       type,
                                       created_at
                                   }) => {
    return {
        text,
        type,
        created_at
    };
};

export const formatTeacher = teacher => {
    const {
        image,
        first_name,
        last_name,
        middle_name,
        phone,
        email,
        gender,
        title,
        trcn_id,
        dob,
        address,
        lga,
        mobile,
        state,
        job_title,
        uuid,
        exam,
        specialization,
        education,
        fingerprint,
        school_id,
        nationality,
    } = teacher;
    return {
        image,
        first_name,
        last_name,
        middle_name,
        phone,
        email,
        gender,
        uploaded: true,
        title,
        trcn_id,
        dob,
        address,
        lga,
        mobile,
        state,
        job_title,
        uuid,
        exam,
        specialization,
        education,
        fingerprint,
        school_id,
        nationality,
    };
};

export const isNumberOnly = text => /^[+()\d-]+$/.test(text);

export const parseEmailOrPhone = text => {
    if (isNumberOnly(text)) {
        return '234' + text.slice(text.length - 10);
    }
    return text;
};
