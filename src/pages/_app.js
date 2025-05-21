import {Provider, useSelector} from 'react-redux';
import {store} from '@/state/store';
import {ConfigProvider} from "antd";
import '../styles/globals.css';
import {IntlProvider} from "next-intl";
import {useEffect, useState} from "react";
import LoadingScreen from "@/components/ui/dialogs/LoadingScreen";

function LocaleWrapper({children}) {
    const locale = useSelector((state) => state.general.locale);
    const [messages, setMessages] = useState(null);

    useEffect(() => {
        setMessages(null);
        import(`@/locales/${locale}.json`).then(res => setMessages(res.default))
    }, [locale])

    if (!messages) return null;

    return (
        <IntlProvider key={locale} locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
}

const theme = {
    token: {
        colorPrimary: 'rgb(44, 62, 80)', // Custom primary color
        borderRadius: 4, // Global border radius
        fontSize: 13, // Default font size
        colorTextHeading:'rgb(44, 62, 80, 0.75)',
        colorText:'rgb(44, 62, 80)',


    },
    components: {
        Tree: {
            nodeHoverBg:'rgb(44, 62, 80, 0.05)',
            nodeSelectedBg: 'rgb(44, 62, 80, 0.15)',
            nodeSelectedColor: 'rgb(44, 62, 80)',
        },
        Tabs:{
            cardPaddingSM: '2px 8px',
            cardPadding: '2px 8px',
        },
        Table:{
            cellPaddingBlock: 2
        }
    },
};


export default function ({ Component, pageProps }) {

    return (
        <Provider store={store}>
            <LocaleWrapper>
                <ConfigProvider theme={theme}>
                    <Component {...pageProps} />
                    <LoadingScreen/>
                </ConfigProvider>
            </LocaleWrapper>
        </Provider>
    )
}