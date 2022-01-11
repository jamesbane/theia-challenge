import React from 'react'
import cn from 'classnames';
import style from './NotFound.module.scss';
import Layout from '../../components/Layout';

export default function NotFound() {
    return (
        <Layout>
            <div className={cn(style.container, 'content content_level_2')}>
                <h1>
                    404
                </h1>
                <h3>NOT FOUND</h3>
                <p>
                    The page you are looking for can&apos;t be found
                </p>
            </div>
        </Layout>
    )
}