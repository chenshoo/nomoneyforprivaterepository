import React from 'react';
import classNames from 'classnames';

export default ({ history, category }) => (
    <div className="flex popular-tabs text-center">
        <div
            onClick={() => history.push('/memes/popular')}
            className={classNames("popular-tab clickable", { active: category === 'popular'  })}
        >
            השבוע
        </div>
        <div
            onClick={() => history.push('/memes/all-time-popular')}
            className={classNames("popular-tab clickable", { active: category === 'all-time-popular'  })}
        >
            בכל הזמנים
        </div>
    </div>
)


