import { FilterOutlined, SortAscendingOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { POPUP } from '@/frontend/shared/constants';
export const headerBtns = [
    {
        icon: React.createElement(FilterOutlined),
        id: 0,
        type: 'filter',
    },
    {
        icon: React.createElement(SortAscendingOutlined),
        id: 1,
        type: 'sort',
    },
    {
        icon:React.createElement(PlusOutlined),
        id: 2,
        type: 'add',
        onClick: POPUP.TASKS.ADD,
    },
]