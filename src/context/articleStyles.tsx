import React, { createContext } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';

export type StylesMap = {
	'--font-family': string;
	'--font-size': string;
	'--font-color': string;
	'--container-width': string;
	'--bg-color': string;
};

export const defaultStyles: StylesMap = {
	'--font-family': defaultArticleState.fontFamilyOption.value,
	'--font-size': defaultArticleState.fontSizeOption.value,
	'--font-color': defaultArticleState.fontColor.value,
	'--container-width': defaultArticleState.contentWidth.value,
	'--bg-color': defaultArticleState.backgroundColor.value,
};

export const ArticleStylesContext = createContext<{
	articleStyles: StylesMap;
	setArticleStyles: React.Dispatch<React.SetStateAction<StylesMap>>;
}>({ articleStyles: defaultStyles, setArticleStyles: () => undefined });

export default ArticleStylesContext;
