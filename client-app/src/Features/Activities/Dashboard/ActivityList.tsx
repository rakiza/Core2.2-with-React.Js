import React, { useContext, Fragment } from 'react'
import { observer } from 'mobx-react-lite';
import { Item, Label } from 'semantic-ui-react'

import ActivityStore from '../../../App/Stores/ActivityStore';
import ActivityListItem from './ActivityListItem';

const ActivityList: React.FC = () => {

    const activityStore = useContext(ActivityStore);
    const { activitiesByDateAsc: activities } = activityStore;

    return (
        <Fragment>
            {
                activities.map(([group, items]) => (
                    <Fragment key={group}>
                        <Label content={group} size='medium' color='blue' />
                        <Item.Group divided >
                            {
                                items.map(it =>
                                    <ActivityListItem key={it.id} activity={it} />
                                )
                            }
                        </Item.Group>
                    </Fragment>
                ))
            }

        </Fragment>
    )
}

export default observer(ActivityList)
