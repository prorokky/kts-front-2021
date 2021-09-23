import { normalizeRepoBranches, RepoBranchesApi, RepoBranchesModel } from '@store/models/gitHubRepos/repoBranches';
import ApiStore from '@store/rootStore';
import { HTTPMethod } from '@store/rootStore/types';
import { ILocalStore } from '@utils/useLocalStore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { CollectionModel, getInitialCollectionModel } from '../models/shared/collection';
import { GetOrganizationRepoBranchesParams, IBranchesDrawerStore } from './types';

const BASE_URL = 'https://api.github.com'

type PrivateFields = '_branches' | '_errorMessage'

export default class BranchesDrawerStore implements IBranchesDrawerStore, ILocalStore {
    private readonly apiStore = new ApiStore(BASE_URL);

    private _branches: CollectionModel<string, RepoBranchesModel> = getInitialCollectionModel()
    private _errorMessage: string = ''

    constructor() {
        makeObservable<BranchesDrawerStore, PrivateFields>(this, {
            _branches: observable,
            _errorMessage: observable,
            branches: computed,
            errorMessage: computed,
            getOrganizationRepoBranches: action
        })
    }

    get branches(): RepoBranchesModel[] {
        return this._branches.order.map((name) => this._branches.entities[name])
    }

    get errorMessage(): string {
        return this._errorMessage
    }

    async getOrganizationRepoBranches(
        params: GetOrganizationRepoBranchesParams
    ): Promise<void> {
        this._branches = getInitialCollectionModel()
        this._errorMessage = ''

        const response = await this.apiStore.request<RepoBranchesApi[]>({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `/repos/${params.owner}/${params.repo}/branches`
        })

        runInAction(() => {
            if (response.success) {
                try {
                    const loadBranches = getInitialCollectionModel()
                    for (const item of response.data) {
                        loadBranches.order.push(item.name)
                        loadBranches.entities[item.name] = normalizeRepoBranches(item)
                    }
                    this._branches = loadBranches
                    return
                } catch (e) {
                    this._errorMessage = 'Что-то пошло не так'
                }
            }

            this._branches = getInitialCollectionModel()
            this._errorMessage = 'Что-то пошло не так'
        })
        
    }
    
    destroy(): void {
        //destroy method, nothing to do
    }
}