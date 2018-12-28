import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends React.Component {

    constructor() {
        super();

        this.maxId = 100;

        this.state = {
            todoData: [
                this.createTodoItem('Drink Coffee'),
                this.createTodoItem('Make Awesome App'),
                this.createTodoItem('Have a lunch'),
            ],
            term: '',
            filterMark: 'all' // active, all, done
        }

        this.deleteItem = (id) => {
            this.setState(({ todoData }) => {
                const index = todoData.findIndex((el) => el.id === id)

                const newData = [
                    ...todoData.slice(0, index),
                    ...todoData.slice(index + 1)
                ]

                return {
                    todoData: newData
                }
            })
        }

        this.addItem = (text) => {
            // generate id
            const newItem = this.createTodoItem(text);

            // add element in array
            this.setState(({ todoData }) => {

                const newData = [
                    ...todoData,
                    newItem
                ]

                return {
                    todoData: newData
                }
            })
            console.log('Added', text);
        }

        this.onToggleImportant = (id) => {
            this.setState(({ todoData }) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                }
            })
        }

        this.onToggleDone = (id) => {
            this.setState(({ todoData }) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'done')
                }
            })
        }

        this.onFilterChange = (filterMark) => {
            this.setState({ filterMark })
        }

        this.onSearchChange = (term) => {
            this.setState({ term })
        }

        this.search = (items, term) => {
            if (term.length === 0) {
                return items
            }
            return items.filter((item) => {
                return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1
            })
        }

        this.filters = (items, filterMark) => {
            switch(filterMark) {
                case 'all':
                    return items;
                case 'active':
                    return items.filter((item) => !item.done);
                case 'done':
                    return items.filter((item) => item.done);
                default:
                    return items;
            }
        }
    }

    toggleProperty(arr, id, propName) {
        const index = arr.findIndex((el) => el.id === id);

        // update need object
        const oldItem = arr[index];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        }

        // construct new Data
        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];
    }

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
        }
    }

    render() {
        const { todoData, term, filterMark } = this.state;

        const visibleItem = this.filters(
            this.search(todoData, term), filterMark
        );

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        filterMark={filterMark}
                        onFilterChange={this.onFilterChange} />
                </div>

                <TodoList
                    todos={visibleItem}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone} />

                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        )
    }

}
