import React from 'react';
import {Routes, Route, Navigate,} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage';
import {CreatePage} from './pages/CreatePage';
import {DetailPage} from './pages/DetailPage';
import {LinksPage} from './pages/LinksPage';

export const useRoutes = isAuthenticated =>
(
    <Routes>
        {
            isAuthenticated
            ? (
                <>
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route path="/links" element={<LinksPage />} />
                    <Route path="*" element={<Navigate to="/create"/>} />
                </>
            )
            : (
                <>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="*" element={<Navigate to="/auth"/>} />
                </>
            )
        }
    </Routes>
);