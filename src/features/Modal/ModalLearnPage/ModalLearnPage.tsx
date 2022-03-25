import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {CardType, GradeCardType} from '../../../api/card-api';
import {RootStateType} from '../../../BLL/store';
import {setGradeInTheSelectedCard} from '../../../BLL/cardsReducer';


const grades = ['не знал', 'забыл', 'перепутал', 'долго думал', 'знал'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});

    return cards[res.id + 1];
}

const LearnPage = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const cards = useSelector((store: RootStateType) => store.cards.cards.cards);
    const {id} = useParams();
    const [card, setCard] = useState<CardType>({} as CardType);
    const [grade, setGrade] = useState<GradeCardType>({
        card_id: card._id,
        grade: 0
    })
    const dispatch = useDispatch();
    useEffect(() => {
        if (first) {
            // dispatch(changeCard(id));
            setFirst(false);
        }


        if (cards.length > 0) setCard(getCard(cards));

        return () => {

        }
    }, [dispatch, id, cards, first]);

    const onNext = () => {
        setIsChecked(false);
        if(grade.grade){
            dispatch(setGradeInTheSelectedCard(grade))
        }
        if (cards.length > 0) {
            // dispatch
            setGrade({...grade, grade: 0})
            setCard(getCard(cards));
        } else {

        }
    }
    const setUserGrade = (grade: string) => {
        setGrade({
            grade: grades.indexOf(grade) + 1,
            card_id: card._id
        })
    }

    return (
        <div>
            Learn Page
            <div>{card.question}</div>
            <div>
                <button onClick={() => setIsChecked(true)}>check</button>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <button key={'grade-' + i} className={
                            g === grades[grade.grade -1]? 'active' : ''
                        } onClick={() => setUserGrade(g)}>{g}</button>
                    ))}

                    <div>
                        <button onClick={onNext}>next</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default LearnPage;
