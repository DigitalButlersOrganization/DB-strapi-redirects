import {Page} from '@strapi/strapi/admin';
import {Routes, Route} from 'react-router-dom';
import OverviewPage from "./OverviewPage";
import DetailPage from "./DetailPage";

const App = () => {
    return (
        <Routes>
            <Route index element={<OverviewPage/>}/>
            <Route path="new" element={<DetailPage/>}/>
            <Route path=":id" element={<DetailPage/>}/>
            <Route path="*" element={<Page.Error/>}/>
        </Routes>
    );
};

export {App};
