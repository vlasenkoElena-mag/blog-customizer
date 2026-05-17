import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [formValues, setFormValues] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isFormOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]);

	useEffect(() => {
		if (!isFormOpen) return;
		const handleEscClick = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsFormOpen(false);
			}
		};

		document.addEventListener('keydown', handleEscClick);
		return () => {
			document.removeEventListener('keydown', handleEscClick);
		};
	}, [isFormOpen]);

	const handleArrowButtonClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	const onChange =
		<K extends keyof ArticleStateType>(field: K) =>
		(value: ArticleStateType[K]) => {
			setFormValues((prev) => ({ ...prev, [field]: value }));
		};

	const handleReset = () => {
		setFormValues(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formValues);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isFormOpen} onClick={handleArrowButtonClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text uppercase size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						selected={formValues.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={onChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formValues.fontSizeOption}
						onChange={onChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={formValues.fontColor}
						options={fontColors}
						onChange={onChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formValues.backgroundColor}
						options={backgroundColors}
						onChange={onChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={formValues.contentWidth}
						options={contentWidthArr}
						onChange={onChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
