import { normalizeRepoItem, RepoItemApi, RepoItemModel } from '@store/models/gitHubRepos';
import ApiStore from '@store/rootStore';
import { HTTPMethod } from '@store/rootStore/types';
import { Meta } from '@utils/meta';
import { ILocalStore } from '@utils/useLocalStore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { CollectionModel, getInitialCollectionModel } from './../models/shared/collection';
import { GetOrganizationReposListParams, IReposListStore } from './types';

const BASE_URL = 'https://api.github.com'

type PrivateFields = '_repos' | '_meta' | '_errorMessage' | '_page' | '_selectedRepo' | '_value'

export default class ReposListStore implements IReposListStore, ILocalStore { 
    private readonly apiStore = new ApiStore(BASE_URL);

    private _repos: CollectionModel<number, RepoItemModel> = getInitialCollectionModel()
    private _meta: Meta = Meta.initial
    private _errorMessage: string = ''
    private _page: number = 1
    private _selectedRepo: number = -1
    private _value: string = ''

    constructor() {
        makeObservable<ReposListStore, PrivateFields>(this, {
            _repos: observable, // не использую observable.ref потому что тогда не подгружаются новые
                                // репозитории при бесконечном скролле
            _meta: observable,
            _errorMessage: observable,
            _page: observable,
            _selectedRepo: observable,
            _value: observable,
            repos: computed,
            meta: computed,
            errorMessage: computed,
            page: computed,
            selectedRepo: computed,
            getOrganizationReposList: action,
            getMoreOrganizationReposList: action,
            selectRepo: action,
            setValue: action
        })
    }

    get repos(): RepoItemModel[] {
        return this._repos.order.map((id) => this._repos.entities[id])
    }

    get meta(): Meta {
        return this._meta
    }

    get errorMessage(): string {
        return this._errorMessage
    }

    get page(): number {
        return this._page
    }

    get selectedRepo(): number {
        return this._selectedRepo
    }

    get value(): string {
        return this._value
    }

    async getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<void> {
        this._meta = Meta.loading
        this._repos = getInitialCollectionModel(    )
        this._errorMessage = ''
        this._page = 1

        const response =  await this.apiStore.request<RepoItemApi[]>({
            method: HTTPMethod.GET,
            data: {
                per_page: 30,   
                page: this._page},
            headers: {},
            endpoint: `/orgs/${params.organizationName}/repos`
        })

        runInAction(() => {
            if (response.success) {
                try {
                    const loadRepos = getInitialCollectionModel()
                    for (const item of response.data) {
                        loadRepos.order.push(item.id)
                        loadRepos.entities[item.id] = normalizeRepoItem(item)
                    }
                    this._meta = Meta.success
                    this._page++
                    this._repos = loadRepos
                    return
                } catch (e) {
                    this._meta = Meta.error
                    this._errorMessage = 'Что-то пошло не так'
                    this._repos = getInitialCollectionModel()
                }
            }

            this._meta = Meta.error
            this._errorMessage = 'Что-то пошло не так'
        })
    }

    async getMoreOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<void> {
        this._meta = Meta.loading
        this._errorMessage = ''

        const response =  await this.apiStore.request<RepoItemApi[]>({
            method: HTTPMethod.GET,
            data: {
                per_page: 30,   
                page: this._page},
            headers: {},
            endpoint: `/orgs/${params.organizationName}/repos`
        })

        runInAction(() => {
            if (response.success) {
                try {
                    for (const item of response.data) {
                        this._repos.order.push(item.id)
                        this._repos.entities[item.id] = normalizeRepoItem(item)
                    }
                    this._meta = Meta.success
                    this._page++
                    return
                } catch (e) {
                    this._meta = Meta.error
                    this._errorMessage = 'Что-то пошло не так'
                    this._repos = getInitialCollectionModel()
                }   
            }

            this._meta = Meta.error
            this._errorMessage = 'Что-то пошло не так'
        })
    }

    selectRepo(id: number): void {
        this._selectedRepo = id
    }

    setValue(value: string): void {
        this._value = value
    }

    destroy(): void {
        //destroy method, nothing to do
    }
}
