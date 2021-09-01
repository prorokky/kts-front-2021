// Здесь необходимо продемонстрировать создание и использование GitHubStore

import {ApiResponse} from '../shared/store/ApiStore/types';
import GitHubStore from '../store/GitHubStore/GitHubStore';
import {RepoItem} from "../store/GitHubStore/types";

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = 'ktsstudio';

gitHubStore.getOrganizationReposList({
  organizationName: EXAMPLE_ORGANIZATION
}).then((result: ApiResponse<RepoItem[], any>) => {
  if (result.success) {
    // eslint-disable-next-line no-console
    console.log(result.data.map(el => {
      return el.name
    }))
  }

  // eslint-disable-next-line no-console
  console.log(result); // в консоли появится список репозиториев в ktsstudio
})

// В ДЗ 1 Не требуется визуально в разметке отображать результат запроса к сети. Достаточно вывести в console.log
