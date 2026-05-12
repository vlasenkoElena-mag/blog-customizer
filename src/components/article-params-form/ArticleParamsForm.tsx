import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, useContext } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { ArticleStylesContext, defaultStyles } from 'src/context/articleStyles';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { setArticleStyles } = useContext(ArticleStylesContext);

	type Values = {
		fontFamily: (typeof fontFamilyOptions)[number];
		fontSize: (typeof fontSizeOptions)[number];
		fontColors: (typeof fontColors)[number];
		backgroundColors: (typeof backgroundColors)[number];
		contentWidth: (typeof contentWidthArr)[number];
	};

	const defaultFormState = {
		fontFamily: fontFamilyOptions[0],
		fontSize: fontSizeOptions[0],
		fontColors: fontColors[0],
		backgroundColors: backgroundColors[0],
		contentWidth: contentWidthArr[0],
	};

	const [values, setValues] = useState<Values>(defaultFormState);

	const handleArrowButtonClick = () => {
		setIsOpen(!isOpen);
	};

	const handleChange = <T extends keyof Values>(
		field: T,
		option: Values[T]
	) => {
		setValues((prev) => ({ ...prev, [field]: option } as Values));
	};

	const handleReset = () => {
		setValues(defaultFormState);
		setArticleStyles(defaultStyles);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleStyles({
			'--font-family': values.fontFamily.value,
			'--font-size': values.fontSize.value,
			'--font-color': values.fontColors.value,
			'--container-width': values.contentWidth.value,
			'--bg-color': values.backgroundColors.value,
		});
	};

	const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target === e.currentTarget) {
			setIsOpen(false);
		}
	};

	return (
		<>
			<div
				className={clsx('', {
					[styles.overlay]: isOpen,
				})}
				onClick={handleOverlayClick}></div>
			<ArrowButton isOpen={isOpen} onClick={handleArrowButtonClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text uppercase size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={values.fontFamily}
						options={fontFamilyOptions}
						onChange={(opt) => handleChange('fontFamily', opt)}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={values.fontSize}
						onChange={(opt) => handleChange('fontSize', opt)}
						title='Размер шрифта'
					/>
					<Select
						selected={values.fontColors}
						options={fontColors}
						onChange={(opt) => handleChange('fontColors', opt)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={values.backgroundColors}
						options={backgroundColors}
						onChange={(opt) => handleChange('backgroundColors', opt)}
						title='Цвет фона'
					/>
					<Select
						selected={values.contentWidth}
						options={contentWidthArr}
						onChange={(opt) => handleChange('contentWidth', opt)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
			{/* </div> */}
		</>
	);
};
