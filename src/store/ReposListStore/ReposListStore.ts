import { normalizeRepoItem, RepoItemApi, RepoItemModel } from '@store/models/gitHubRepos';
import ApiStore from '@store/rootStore';
import { HTTPMethod } from '@store/rootStore/types';
import { getMoreOrganizationReposListEndPoint, getOrganizationReposListEndPoint } from '@utils/endpoint';
import { Meta } from '@utils/meta';
import { ILocalStore } from '@utils/useLocalStore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { CollectionModel, getInitialCollectionModel } from './../models/shared/collection';
import { GetOrganizationReposListParams, IReposListStore } from './types';

const BASE_URL = 'https://api.github.com'

type PrivateFields = '_repos' | '_meta' | '_errorMessage' | '_page' | '_selectedRepo' | '_value' | '_default_repos'

export default class ReposListStore implements IReposListStore, ILocalStore { 
    private readonly apiStore = new ApiStore(BASE_URL);

    private _repos: CollectionModel<number, RepoItemModel> = getInitialCollectionModel()
    private _meta: Meta = Meta.initial
    private _errorMessage: string = ''
    private _page: number = 1
    private _selectedRepo: RepoItemModel | null = null
    private _value: string = ''
    private _default_repos: CollectionModel<number, RepoItemModel> = getInitialCollectionModel()

    constructor() {
        makeObservable<ReposListStore, PrivateFields>(this, {
            _repos: observable, // не использую observable.ref потому что тогда не подгружаются новые
                                // репозитории при бесконечном скролле
            _meta: observable,
            _errorMessage: observable,
            _page: observable,
            _selectedRepo: observable,
            _value: observable,
            _default_repos: observable,
            repos: computed,
            meta: computed,
            errorMessage: computed,
            page: computed,
            selectedRepo: computed,
            getDefaultGitRepos: action,
            getOrganizationReposList: action,
            getMoreOrganizationReposList: action.bound,
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

    get selectedRepo(): RepoItemModel | null {
        return this._selectedRepo
    }

    get value(): string {
        return this._value
    }

    get default_repos(): RepoItemModel[] {
        return this._default_repos.order.map((id) => this._default_repos.entities[id])
    }

    async getDefaultGitRepos(
        params: GetOrganizationReposListParams
    ): Promise<void> {
        this._meta = Meta.loading
        this._default_repos = getInitialCollectionModel(    )
        this._errorMessage = ''

        const response =  await this.apiStore.request<RepoItemApi[]>({
            method: HTTPMethod.GET,
            data: {
                per_page: 100,
                page: this._page},
            headers: {},
            endpoint: getOrganizationReposListEndPoint(params.organizationName)
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
                    this._default_repos = loadRepos
                    return
                } catch (e) {
                    this._meta = Meta.error
                    this._errorMessage = 'Что-то пошло не так'
                    this._default_repos = getInitialCollectionModel()
                }
            }

            this._meta = Meta.error
            this._errorMessage = 'Что-то пошло не так'
        })
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
                per_page: 100,   
                page: this._page},
            headers: {},
            endpoint: getOrganizationReposListEndPoint(params.organizationName)
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
    ): Promise<void> {
        this._meta = Meta.loading
        this._errorMessage = ''

        const response =  await this.apiStore.request<RepoItemApi[]>({
            method: HTTPMethod.GET,
            data: {
                per_page: 100,   
                page: this._page},
            headers: {},
            endpoint: getMoreOrganizationReposListEndPoint(this.value)
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

    selectRepo(repo: RepoItemModel | null): void {
        this._selectedRepo = repo
    }

    setValue(value: string): void {
        this._value = value
    }

    destroy(): void {
        //destroy method, nothing to do
    }
}
