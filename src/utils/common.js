import { orderBy, uniq } from "lodash";

export const processNotifications = (notificationArray) => {
  let processedNotification = [];
  for (const notification of notificationArray) {
    const {
      id,
      reason,
      updated_at,
      subject: { title = '', url = '', type = '' } = {},
      repository: { full_name = '' } = {},
      unread,
      ignored,
      subscribed
    } = notification;

    const html_url = processPrUrl(url);

    const jiraTicket = findJiraTicketForNotifications(notification);
    const jira = jiraTicket[0] !== undefined ? jiraTicket[0] : '';

    const newNotification = {
      id,
      reason,
      updated_at,
      title,
      type,
      html_url,
      full_name,
      jira,
      subscribed,
      ignored,
      unread
    };
    processedNotification.push(newNotification);
  }
  return sortNotifications(processedNotification);
}

export const processPrUrl = (url) => {
  const parseUrl = new URL(url);
  const { hostname, pathname, protocol } = parseUrl;
  const path = pathname.split('/');
  const newUrl = `${protocol}//${hostname}/${path[4]}/${path[5]}`;
  return newUrl;
}

const findJiraTicketForNotifications = (item) => {
  const ticket = findByRegex(item.subject.title);
  const cleanedJira = [].concat.apply([], ticket);
  return uniq(cleanedJira.flat());
}

const findByRegex = (message) => {
  let jira = [];
  const xpsRegex = 'XPS-\\d{3,6}';
  const horizonRegex = 'HORIZON-\\d{3,6}';
  const xps = message.match(xpsRegex);
  const horizon = message.match(horizonRegex);
  if (xps) { jira.push(xps); }
  if (horizon) { jira.push(horizon); }
  return jira;
}

const sortNotifications = (notifications) => orderBy(notifications, ['updated_at'], ['desc']);

export const findElementIndexById = (array, id) => array.findIndex((element) => element.id === id);

export const findMatchingElementById = (array, id) => array.find(element => element.id === id);

export const removeObjectFromArrayById = (array, id) => array.filter((object) => object.id !== id);

export const filterById = (array, id) => array.filter((object) => object.id === id);

export const insertObjectIntoArray = (array, object, index) => {
  let newArray = array.slice();
  newArray.splice(index, 0, object);
  return newArray;
}