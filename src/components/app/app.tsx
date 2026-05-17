import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import styles from './app.module.scss';
import { defaultArticleState } from 'src/constants/articleProps';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</main>
	);
};
