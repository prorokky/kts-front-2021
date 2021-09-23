import ApiStore from '@store/rootStore';
import { Meta } from '@utils/meta';
import { ILocalStore } from '@utils/useLocalStore';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import {ApiResponse, HTTPMethod} from "../rootStore/types";
import {
    GetOrganizationRepoBranchesParams, 
    GetOrganizationReposListParams, 
    IGitHubStore, 
    RepoBranches, 
    RepoItem
} from "./types";

const BASE_URL = 'https://api.github.com'

type PrivateFields = '_repos' | '_meta' | '_errorMessage'

export default class GitHubStore implements IGitHubStore, ILocalStore { //TODO: вынести GitHubStore в 2 локальных стора
    private readonly apiStore = new ApiStore(BASE_URL);

    private _repos: RepoItem[] = []
    private _meta: Meta = Meta.initial
    private _errorMessage: string = ''

    constructor() {
        makeObservable<GitHubStore, PrivateFields>(this, {
            _repos: observable.ref,
            _meta: observable,
            _errorMessage: observable,
            repos: computed,
            meta: computed,
            getOrganizationReposList: action
        })
    }

    get repos(): RepoItem[] {
        return this._repos
    }

    get meta(): Meta {
        return this._meta
    }

    get errorMessage(): string {
        return this._errorMessage
    }

    async getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<void> {
        this._meta = Meta.loading
        this._repos = []
        this._errorMessage = ''

        const response =  await this.apiStore.request<RepoItem[ ]>({
            method: HTTPMethod.GET,
            data: {
                per_page: 30,   
                page: params.page},
            headers: {},
            endpoint: `/orgs/${params.organizationName}/repos`
        })

        runInAction(() => {
            if (response.success) {
                this._meta = Meta.success
                this._repos = response.data
            } else {
                this._meta = Meta.error
                this._errorMessage = 'Что-то пошло не так'
            }
        })
    }

    async getOrganizationRepoBranches(
        params: GetOrganizationRepoBranchesParams
    ): Promise<ApiResponse<RepoBranches[], any>> {
        return await this.apiStore.request({
            method: HTTPMethod.GET,
            data: {},
            headers: {},
            endpoint: `/repos/${params.owner}/${params.repo}/branches`
        })
    } 

    destroy(): void {
        
    }
}
