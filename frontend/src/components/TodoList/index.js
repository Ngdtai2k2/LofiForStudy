import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import { fetchData, refresh } from '../../utils/functionHelper';
import { BASE_API_URL, toastTheme } from '../../constants/constant';
import { createAxios } from '../../createInstance';

import IconButtonWithTooltip from '../IconButtonWithTooltip';
import ModalAddTodo from '../ModalAddTodo';
import './styles.css';

export default function TodoList({ setState }) {
  const [todoList, setTodoList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [itemStatus, setItemStatus] = useState({});
  const [openModalAddTodo, setOpenModalAddTodo] = useState(false);

  const dispatch = useDispatch();
  const page = useRef(1);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  let axiosJWT = createAxios(user, dispatch);

  useEffect(() => {
    if (user) {
      fetchData(
        `${BASE_API_URL}/todo-list/${user?._id}`,
        setTodoList,
        todoList,
        setHasMore,
        page,
        accessToken,
        axiosJWT,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeStatus = async (id) => {
    try {
      const response = await axiosJWT.post(
        `${BASE_API_URL}/todo-list/change-status/${user?._id}/${id}`,
        {
          headers: { token: `Bearer ${accessToken}` },
          'Content-Type': 'multipart/form-data',
        },
      );
      setItemStatus((prevStatus) => ({
        ...prevStatus,
        [id]: !prevStatus[id],
      }));
      toast.success(response.data.message, toastTheme);
    } catch (error) {
      toast.error(
        'If something goes wrong, contact support or try again later!',
        toastTheme,
      );
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axiosJWT.delete(
        `${BASE_API_URL}/todo-list/delete/${user?._id}/${id}`,
        {
          headers: { token: `Bearer ${accessToken}` },
          'Content-Type': 'multipart/form-data',
        },
      );
      setTodoList(todoList.filter((item) => item._id !== id));
      toast.success(response.data.message, toastTheme);
    } catch (error) {
      toast.error(
        'If something goes wrong, contact support or try again later!',
        toastTheme,
      );
    }
  };

  useEffect(() => {
    const initialItemStatus = {};
    todoList.forEach((item) => {
      initialItemStatus[item._id] = item.status;
    });
    setItemStatus(initialItemStatus);
  }, [todoList]);

  const refreshDataTodoList = () => {
    refresh(
      `${BASE_API_URL}/todo-list/${user._id}`,
      setTodoList,
      setHasMore,
      page,
      accessToken,
      axiosJWT,
    );
  };

  return (
    <>
      {user ? (
        <>
          <Box className="todo-list-nav">
            <Typography variant="h6" sx={{ color: '#ffffff' }}>
              TodoList
            </Typography>
            <Box>
              <IconButtonWithTooltip
                title="Add todo"
                sx={{ p: 0.5 }}
                onClick={() => setOpenModalAddTodo(true)}
                icon={<NoteAddIcon sx={{ color: 'white' }} />}
              />
              <IconButtonWithTooltip
                title="Refresh todo list"
                sx={{ p: 0.5 }}
                onClick={() => refreshDataTodoList()}
                icon={<RefreshRoundedIcon sx={{ color: 'white' }} />}
              />
              <ModalAddTodo
                openModal={openModalAddTodo}
                handleClose={() => setOpenModalAddTodo(false)}
                setState={setState}
                refreshData={() => refreshDataTodoList()}
              />
              <IconButtonWithTooltip
                title="Todo list information"
                sx={{ p: 0.5 }}
                icon={<InfoRoundedIcon sx={{ color: 'white' }} />}
              />
            </Box>
          </Box>
          <Box className="todo-list-container" id="scrollable-todo-list">
            <InfiniteScroll
              dataLength={todoList.length}
              next={() => {
                if (hasMore) {
                  fetchData(
                    `${BASE_API_URL}/todo-list/${user._id}`,
                    setTodoList,
                    todoList,
                    setHasMore,
                    page,
                    accessToken,
                    axiosJWT,
                  );
                }
              }}
              hasMore={hasMore}
              loader={<h6>Loading...</h6>}
              endMessage={
                todoList.length === 0 ? (
                  ''
                ) : (
                  <p style={{ textAlign: 'center', fontSize: 12 }}>
                    <i>Yay! You have seen it all</i>
                  </p>
                )
              }
              scrollableTarget="scrollable-todo-list"
              style={{ width: '100%' }}
            >
              <List sx={{ width: '100%' }}>
                {todoList.length === 0 ? (
                  <ListItem key={todoList.length}>No data!</ListItem>
                ) : (
                  todoList.map((item) => (
                    <ListItem
                      className={`list-item ${itemStatus[item._id] ? 'status-done' : ''}`}
                      sx={{ justifyContent: 'space-between' }}
                      key={item?._id}
                    >
                      <Typography>{item.title}</Typography>
                      <Box display="flex" alignItems="center">
                        <Checkbox
                          style={{ color: 'white' }}
                          checked={itemStatus[item._id] ? true : false}
                          onChange={() => handleChangeStatus(item._id)}
                        />
                        <IconButtonWithTooltip
                          title="Delete todo"
                          sx={{ p: 0.5 }}
                          onClick={() => handleDeleteItem(item._id)}
                          icon={
                            <DeleteForeverRoundedIcon
                              sx={{ width: 25, height: 25, color: '#ffffff' }}
                            />
                          }
                        />
                      </Box>
                    </ListItem>
                  ))
                )}
              </List>
            </InfiniteScroll>
          </Box>
        </>
      ) : (
        <Typography variant="body1" color="white" textAlign="center">
          Sign in to use this feature!
        </Typography>
      )}
    </>
  );
}
