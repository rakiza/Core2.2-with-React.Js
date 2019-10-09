import React, { useContext, useEffect, useState } from 'react'
import { Segment, Form, Button, Grid } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';

import ActivityStore from '../../../App/Stores/ActivityStore';
import { ActivityFormValues } from '../../../App/Models/Activity';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../App/Commun/Form/TextInput';
import TextAreaInput from '../../../App/Commun/Form/TextAreaInput';
import SelectInput from '../../../App/Commun/Form/SelectInput';
import DateTimeInput from '../../../App/Commun/Form/DateTimeInput';
import { CombineDateAndTime } from '../../../App/Commun/Util/Util';
import { combineValidators, isRequired, hasLengthGreaterThan,composeValidators } from 'revalidate';

const validateActivityForm = combineValidators({
    title: isRequired('Title'),
    description: composeValidators(
        isRequired,
        hasLengthGreaterThan(3)
    )({message:'bla bla bla'}),    
    category: isRequired('Category'),
    date: isRequired('Date'),
    time: isRequired('Time'),
    city: isRequired('City'),
    venue: isRequired('Venue')
})

interface editParams {
    id: string;
}
const ActivityForm: React.FC<RouteComponentProps<editParams>> = ({ match, history }) => {

    const activityStore = useContext(ActivityStore);
    const { loadActivity } = activityStore;
    //let activity:IActivity;

    const [activity, setactivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id)
                .then((result) => {
                    setactivity(new ActivityFormValues(result));
                })
                .finally(() => setLoading(false));
        }
        //clean data after mounting
        /* return (() => {
            unSelectActivity();
        }); */
    }, [loadActivity, match.params.id]);



    /* const inputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.currentTarget;
        setactivity({ ...activity, [name]: value });
    } */

    /* const handleSubmit = () => {
        activityStore.writeChange(activity)
            .then(() => {
                history.push(`/activities/details/${activity.id}`)
            })
    } */

    const submitFinalForm = (values: any) => {
        const dateAndTime = CombineDateAndTime(values.date, values.time);
        const { date, time, ...activity } = values;
        activity.date = dateAndTime;

        activityStore.writeChange(activity)
            /* .then(() => {
                history.push(`/activities/details/${activity.id}`)
            }) */
            .catch(err => console.log(err));
    }
    //if(loading) return <Loading content='Loading activity...'/>
    return (
        <Grid>
            <Grid.Column width='10'>
                <Segment clearing>
                    <FinalForm   
                        validate={validateActivityForm}
                        initialValues={activity}
                        onSubmit={submitFinalForm}
                        render={({ handleSubmit,invalid, pristine }) => (
                            <Form
                                loading={loading}
                                onSubmit={handleSubmit}

                                key={activity.id}>
                                <h4>Editing {activity.title}</h4>
                                <Field placeholder='Title' name='title' value={activity.title} component={TextInput} />

                                <Field placeholder='Description' name='description' value={activity.description} rows='2' component={TextAreaInput} />

                                <Field placeholder='Category' name='category' value={activity.category} component={SelectInput} options={
                                    [
                                        { 'key': 'music', 'value': 'music', 'text': 'Music' },
                                        { 'key': 'film', 'value': 'film', 'text': 'Film' },
                                        { 'key': 'culture', 'value': 'culture', 'text': 'Culture' },
                                        { 'key': 'drink', 'value': 'drink', 'text': 'Drink' },
                                        { 'key': 'food', 'value': 'food', 'text': 'Food' },
                                        { 'key': 'travel', 'value': 'travel', 'text': 'Travel' },
                                    ]

                                } />
                                <Form.Group widths='equal'>
                                    <Field name='date' placeholder='Date' date component={DateTimeInput} value={activity.date} />
                                    <Field name='time' placeholder='Time' time component={DateTimeInput} value={activity.date} />
                                </Form.Group>


                                <Field placeholder='City' name='city' value={activity.city} component={TextInput} />

                                <Field placeholder='Venue' name='venue' value={activity.venue} component={TextInput} />

                                <Button floated='right' type='submit' positive content='Save' loading={activityStore.submitting} disabled={loading || invalid || pristine} />

                                <Button floated='right' type='button' content='Cancel' as={Link} to={activity.id ? `/activities/details/${activity.id}` : '/activities'} disabled={loading} />
                            </Form>
                        )}
                    >


                    </FinalForm>

                </Segment>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityForm)
