import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import styles from './app.module.scss';
import {
	ArticleStylesContext,
	defaultStyles,
	StylesMap,
} from 'src/context/articleStyles';

export const App = () => {
	const [articleStyles, setArticleStyles] = useState<StylesMap>(defaultStyles);

	return (
		<ArticleStylesContext.Provider value={{ articleStyles, setArticleStyles }}>
			<main
				className={clsx(styles.main)}
				style={articleStyles as CSSProperties}>
				<ArticleParamsForm />
				<Article />
			</main>
		</ArticleStylesContext.Provider>
	);
};
